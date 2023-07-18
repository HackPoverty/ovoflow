import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  onPrevious?: string;
  onNext?: string;
};

export default function PaginationButtons({ onPrevious, onNext }: Props) {
  const t = useTranslations("ListNavigation");

  return (
    <>
      <Link
        href={onPrevious || "#"}
        className={`btn rounded-full ${onPrevious ? "btn-primary" : "btn-disabled"}`}
      >
        <ChevronLeft />
        {t("previous")}
      </Link>
      {/* Next */}
      <Link
        href={onNext || "#"}
        className={`btn rounded-full ${onNext ? "btn-primary" : "btn-disabled"}`}
      >
        {t("next")}
        <ChevronRight />
      </Link>
    </>
  );
}
