import { PropsWithChildren, createContext, useContext } from "react";
import { TechnicianVisit } from "./schema";

const SchemaContext = createContext({} as TechnicianVisit);

export function TechnicianVisitProvider(
  props: PropsWithChildren<{ technicianVisit: TechnicianVisit }>,
) {
  return (
    <SchemaContext.Provider value={props.technicianVisit}>{props.children}</SchemaContext.Provider>
  );
}

export function useTechnicianVisitContext() {
  return useContext<TechnicianVisit>(SchemaContext);
}
