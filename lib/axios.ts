import { getCookie } from "cookies-next";
import { CaseType, deserialize } from "jsonapi-fractal";
import { AuthorizationError, NotFoundError, ServerError } from "./error";

const JSONAPI_URL = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi_data`;

const makeParams = (params?: Record<string, any>) => {
  if (!params) return "";
  return (
    "?" +
    Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&")
  );
};

function jsonDeserialize<Type>(data: any) {
  return deserialize<Type>(data, { changeCase: CaseType.camelCase }) as Type;
}

export async function jsonApiFetch<Type>(resource: string, params?: Record<string, any>) {
  const token = getCookie("token");
  const response = await fetch(`${JSONAPI_URL}/${resource}${makeParams(params)}`, {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (response.ok) {
    return jsonDeserialize<Type>(await response.json());
  }

  if (response.status === 401 || response.status === 403) {
    throw new AuthorizationError();
  } else if (response.status === 404) {
    throw new NotFoundError();
  } else {
    throw new ServerError();
  }
}

export async function jsonApiFetchPaginated<Type>(
  resource: string,
  params?: Record<string, any>,
  limit = 10,
  offset = 0,
) {
  const token = getCookie("token");
  const paramsWithPagination = {
    ...params,
    "page[limit]": limit,
    "page[offset]": offset,
  };
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${JSONAPI_URL}/${resource}${makeParams(paramsWithPagination)}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (response.ok) {
    const data = await response.json();
    const isFirst = offset === 0 || data.links?.prev === undefined;
    const isLast = data.links?.next === undefined;
    return {
      data: jsonDeserialize<Type[]>(data),
      isFirst,
      isLast,
    };
  }

  if (response.status === 401 || response.status === 403) {
    throw new AuthorizationError();
  } else if (response.status === 404) {
    throw new NotFoundError();
  } else {
    throw new ServerError();
  }
}

export async function jsonApiPost(resource: string, body?: any, params?: Record<string, any>) {
  const token = getCookie("token");
  const response = await fetch(`${JSONAPI_URL}/${resource}${makeParams(params)}`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) return response;
  if (response.status === 401 || response.status === 403) {
    throw new AuthorizationError();
  } else {
    throw new ServerError();
  }
}
