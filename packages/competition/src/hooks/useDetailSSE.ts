import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSubmitStore } from "../stores/useSubmitStore";
import { Detail, useDetailStore } from "../stores/useDetailStore";

const devBaseURL = "/api";

let SSEInstance: EventSource | undefined;

export const useDetailSSE = () => {
  const contestId = localStorage.getItem("contestId");
  const { problemId } = useParams();
  const submitId = useSubmitStore((state) => state.submitId);
  const [url, setUrl] = useState<string | undefined>();
  const setDetailState = useDetailStore((state) => state.setDetailState);
  const clearHistory = useDetailStore((state) => state.clearHistory);
  const endSubmit = useSubmitStore((state) => state.endSubmit);

  useEffect(() => {
    submitId &&
      setUrl(
        `${devBaseURL}/user/contests/${contestId}/problems/${problemId}/submission/${submitId}`,
      );
  }, [contestId, problemId, submitId]);

  useEffect(() => {
    if (url !== undefined) {
      clearHistory();
      console.log("url", url);

      SSEInstance = new EventSource(url);

      SSEInstance.onopen = function () {
        console.log("SSE成功打开");
        // onOpen();
      };

      SSEInstance.onerror = function (event: Event) {
        console.log("SSE链接断开", event);
        // onError(event);
      };

      SSEInstance.onmessage = function (event: MessageEvent<string>) {
        console.log("SSE收到信息", JSON.parse(event.data));
        setDetailState(JSON.parse(event.data) as Detail);
      };

      return () => {
        SSEInstance?.close();
        SSEInstance = undefined;
        endSubmit();
      };
    }
  }, [url, clearHistory, setDetailState, endSubmit]);
};
