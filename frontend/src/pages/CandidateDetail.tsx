import React from 'react';
import { useParams } from 'react-router-dom';

export default function CandidateDetail() {
  const { id } = useParams();
  
  return (
    <div className="main-layout p-6">
      <h1 className="text-2xl">Candidate Detail for {id}</h1>
    </div>
  );
}
