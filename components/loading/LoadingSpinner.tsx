export default function LoadingSpinner({ label }: { label: string }) {
  return (
    <>
      <span className="loading loading-dots loading-lg"></span>
      <p>{label}</p>
    </>
  );
}
