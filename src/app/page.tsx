"use client";
import { ZendeskProvider } from "react-use-zendesk";
import { ExampleList } from "./components/ExampleList";
import { useEffect, useState } from "react";
import { ValuesContainer } from "@/app/components/ValuesContainer"
import { CallbackContainer } from "./components/CallbackContainer";
import { KeyForm } from "@/app/components/Keyform";
import { toast } from "sonner";

export default function Page(): JSX.Element {
  const [apiKey, setApiKey] = useState("");
  const [callbacks, setCallBacks] = useState<
    { params: unknown; id: string; key: string }[]
  >([]);

  function handleOpen() {
    toast("onOpen callback");
    
    setCallBacks((old) => [
      {
        params: arguments,
        id: "onOpen",
        key: "onOpen" + old.length,
      },
      ...old,
    ]);
  }

  function handleClose() {
    toast("onClose callback");
    setCallBacks((old) => [
      {
        params: arguments,
        id: "onClose",
        key: "onClose" + old.length,
      },
      ...old,
    ]);
  }

  function handleUnreadMessages() {
    setCallBacks((old) => [
      {
        params: arguments,
        id: "onUnreadMessages",
        key: "onUnreadMessages" + old.length,
      },
      ...old,
    ]);
  }

  function handleResetWidget() {
    toast("onResetWidget callback");
    setCallBacks((old) => [
      {
        params: arguments,
        id: "onResetWidget",
        key: "onResetWidget" + old.length,
      },
      ...old,
    ]);
  }

  function onChangeKey(key: string) {
    setApiKey(key);
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typeof window.zE === 'function') {
        window.zE('messenger:set', 'launcher', {
          label: {
            th: 'สวัสดี! มีอะไรให้ช่วยไหมคะ?',
            en: 'Hello! Need assistance?'
          }
        });
      }
    }, 100); // Show after 7 seconds
  
    return () => clearTimeout(timeout);
  });
  return (
    <div id="root">
    <ZendeskProvider
      apiKey={apiKey}
      onOpen={handleOpen}
      onClose={handleClose}
      onUnreadMessages={handleUnreadMessages}
      onResetWidget={handleResetWidget}
    >
      <main className="main">
        <div className="section-grid">
          <div className="example-list">
            <ExampleList />
          </div>

          <div>
            <KeyForm onChangeKey={onChangeKey} />
            <ValuesContainer />
            <div className="callback-list">
              {callbacks.map(({ id, params, key }) => {
                return <CallbackContainer key={key} params={params} id={id} />;
              })}
            </div>
          </div>
        </div>
      </main>
    </ZendeskProvider>
    </div>
  );
}