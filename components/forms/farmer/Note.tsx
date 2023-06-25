import { FarmerJournal } from "@/types/content";
import { useFormContext } from "react-hook-form";

export default function Note() {
  const { register } = useFormContext<FarmerJournal>();

  return <div className="p-6">
    <textarea 
      className="textarea textarea-accent w-full" 
      rows={10} {...register("fieldCommentdailycheck")}
      placeholder="Leave out your comment" />
  </div>
}