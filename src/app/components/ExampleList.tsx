import { useState, useEffect } from "react";
import { Example, ExampleProps } from "./Example";
import { useConditionalZendeskStyle } from "@/hooks/useZendeskStyler";

export const ExampleList: React.FC = () => {
  const [cookieActive, setCookieActive] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isAdjustStyle,setAdjustStyle] = useState(false)
  // Reset countdown when it reaches zero
  useEffect(() => {
    if (countdown === 0) {
      const timer = setTimeout(() => {
        setCountdown(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const examples: ExampleProps[] = [
    {
      id: "messenger show",
      title: "Show",
      description: (
        <div>
          Displays the widget. The widget is displayed by default on page load.
          You don&apos;t need to call <code>show</code> to display the widget unless
          you use <code>hide.</code>
        </div>
      ),
      buttonText: "show",
      onClick: ({ show }) => {
        show();
      },
    },
    {
      id: "messenger show in 5s",
      title: "Show in (5s)",
      description: (
        <div>
          Displays the widget. The widget is displayed by default on page load.
          You don&apos;t need to call <code>show</code> to display the widget unless
          you use <code>hide.</code>
        </div>
      ),
      buttonText: countdown !== null ? `${countdown}s` : "show",
      onClick: ({ show }) => {
        if (countdown !== null) return; // Prevent multiple clicks
        
        setCountdown(5);
        const intervalId = setInterval(() => {
          setCountdown(prev => {
            if (prev === null || prev <= 1) {
              clearInterval(intervalId);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        setTimeout(() => {
          show();
        }, 5000);
      },
    },
    {
      id: "messenger hide",
      title: "Hide",
      description: (
        <div>
          Hides all parts of the widget from the page. You can invoke it before
          or after page load.
        </div>
      ),
      buttonText: "hide",
      onClick: ({ hide }) => {
        hide();
      },
    },
    {
      id: "messenger hide in 5s",
      title: "Hide in 5s",
      description: (
        <div>
          Hides all parts of the widget from the page. You can invoke it before
          or after page load.
          {countdown !== null && <div>Hiding in {countdown}s...</div>}
        </div>
      ),
      buttonText: countdown !== null ? `${countdown}s` : "hide",
      onClick: ({ hide }) => {
        if (countdown !== null) return; // Prevent multiple clicks
        
        setCountdown(5);
        const intervalId = setInterval(() => {
          setCountdown(prev => {
            if (prev === null || prev <= 1) {
              clearInterval(intervalId);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        setTimeout(() => {
          hide();
        }, 5000);
      },
    },
    {
      id: "messenger open",
      title: "Open",
      description: (
        <div>Opens the messaging Web Widget. Chat become visible</div>
      ),
      buttonText: "open",
      onClick: ({ open }) => {
        open();
      },
    },
    {
      id: "messenger close",
      title: "Close",
      description: <div>Closes the messaging Web Widget.</div>,
      buttonText: "close",
      onClick: ({ close }) => {
        close();
      },
    },
    {
      id: "messenger set EN locale",
      title: "Set EN locale",
      description: (
        <div>
          Sets the locale of the messaging Web Widget. For a list of supported
          locales and associated codes, use the following{" "}
          <a
            href="https://support.zendesk.com/api/v2/locales/public.json"
            target="_blank"
          >
            Zendesk public REST API endpoint
          </a>
        </div>
      ),
      buttonText: "set EN locale",
      onClick: ({ setLocale }) => {
        setLocale("en-US");
      },
    },
    {
      id: "messenger set TH locale",
      title: "Set TH locale",
      description: (
        <div>
          Sets the locale of the messaging Web Widget. For a list of supported
          locales and associated codes, use the following{" "}
          <a
            href="https://support.zendesk.com/api/v2/locales/public.json"
            target="_blank"
          >
            Zendesk public REST API endpoint
          </a>
        </div>
      ),
      buttonText: "set TH locale",
      onClick: ({ setLocale }) => {
        setLocale("th");
      },
    },
    {
      id: "messenger set zIndex",
      title: "Set zIndex",
      description: (
        <div>
          Sets the CSS property z-index on all the iframes for the messaging Web
          Widget.
        </div>
      ),
      buttonText: "set (100) zIndex",
      onClick: ({ setZIndex }) => {
        setZIndex(100);
      },
    },
    {
      id: "messenger set cookies",
      title: "Set cookies",
      description: (
        <div>
          The messaging Web Widget uses a mixture of cookies as well as local
          and session storage in order to function.
        </div>
      ),
      buttonText: `set (${!cookieActive}) cookies`,
      onClick: ({ setCookies }) => {
        setCookies(!cookieActive);
        setCookieActive(!cookieActive);
      },
    },
    {
      id: "messenger set conversationFields",
      title: "Set conversation fields",
      description: (
        <div>
          Allows values for conversation fields to be set in the client to add
          contextual data about the conversation. To learn more about Messaging
          Metadata, see{" "}
          <a
            href="https://support.zendesk.com/hc/en-us/articles/5658339908378"
            target="_blank"
          >
            Introduction to Messaging Metadata.
          </a>
          <br />
          <br />
          example fields: <code>{`[{id: "123456789", value: 100.5}]`}</code>
        </div>
      ),
      buttonText: `set fields`,
      onClick: ({ setConversationFields }) => {
        setConversationFields([{ id: "123456789", value: 100.5 }]);
      },
    },
    {
      id: "messenger set conversationTags",
      title: "Set conversation tags",
      description: (
        <div>
          Allows custom conversation tags to be set in the client to add
          contextual data about the conversation. To learn more about Messaging
          Metadata, see{" "}
          <a
            href="https://support.zendesk.com/hc/en-us/articles/5868905484442"
            target="_blank"
          >
            Introduction to Messaging Metadata.
          </a>
          <br />
          <br />
          example tags: <code>{`["home", "pl", "pdp"]`}</code>
        </div>
      ),
      buttonText: `set tags`,
      onClick: ({ setConversationTags }) => {
        setConversationTags(["home", "pl", "pdp"]);
      },
    },
    {
      id: "messenger logins",
      title: "Login",
      description: (
        <div>
          If your application has a login flow, or if a user needs to access the
          same conversation from multiple devices, you can use the{" "}
          <code>loginUser</code> API.
          <br />
          <br /> This command cannot wotk in this demo since token is{" "}
          <code>xyz</code>
        </div>
      ),
      buttonText: `login`,
      onClick: ({ loginUser }) => {
        loginUser("xyz");
      },
    },
    {
      id: "messenger logout",
      title: "Logout",
      description: (
        <div>
          Your app may have a logout function that brings users back to a login
          screen. In this case, revert the messaging Web Widget to a pre-login
          state by calling the <code>logoutUser</code> API.
        </div>
      ),
      buttonText: `logout`,
      onClick: ({ logoutUser }) => {
        logoutUser();
      },
    },
    {
      id: "resetWidget",
      title: "Reset",
      description: (
        <div>
          This method clears all widget local state, including user data,
          conversations, and connections. To learn more about Reset Widget see{" "}
          <a
            href="https://developer.zendesk.com/api-reference/widget-messaging/web/core/#reset-widget"
            target="_blank"
          >
            Reset Widget
          </a>
          <br />
          Internally the library call this method when api key changes
        </div>
      ),
      buttonText: "reset",
      onClick({ resetWidget }) {
        resetWidget();
      },
    },
  ];
  useConditionalZendeskStyle(isAdjustStyle)
  return (
    <>
    <Example
            id={'override-position'}
            key={''}
            title={'Overide Position'}
            description={'we can override chat position'}
            onClick={() => setAdjustStyle(!isAdjustStyle)}
            buttonText={'Override Here'}
          />
    {/* <button className="button" onClick={() => setAdjustStyle(true)}>Override Here</button> */}
      {examples.map((example) => {
        const { title, description, onClick, buttonText, id } = example;

        return (
          <Example
            id={id}
            key={id}
            title={title}
            description={description}
            onClick={onClick}
            buttonText={buttonText}
          />
        );
      })}
    </>
  );
};