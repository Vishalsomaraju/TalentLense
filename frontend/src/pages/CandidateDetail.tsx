import { useParams } from "react-router-dom";
import type React from "react";

export default function CandidateDetail(): React.JSX.Element {
  const { id } = useParams();

  return (
    <div className="main-layout p-6">
      <h1 className="text-2xl">Candidate Detail for {id}</h1>
    </div>
  );
}
