import { useEffect, useRef } from "react";
import { useSubmitStore } from "../stores/useSubmitStore";
import { useParams } from "react-router-dom";
import { useSwrHistorySubmits } from "../swrHooks/problem";

export const useSubmissons = () => {
  const submitState = useSubmitStore((state) => state.submitState);
  const contestId = localStorage.getItem("contestId");
  const { problemId } = useParams();
  const prevSubmitState = useRef(submitState);
  const { data: swrData, mutate } = useSwrHistorySubmits(
    contestId!,
    problemId as unknown as string,
  );
  useEffect(() => {
    const performMutation = async () => {
      if (
        prevSubmitState.current === "Submitting" &&
        submitState === "UnSubmitted" &&
        contestId &&
        problemId
      ) {
        await mutate();
      }
      prevSubmitState.current = submitState;
    };

    void performMutation();
  }, [submitState]);

  return swrData;
};
