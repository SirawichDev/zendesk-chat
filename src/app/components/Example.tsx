"use client"
import { ZendeskContextValues, useZendesk } from "react-use-zendesk";

export interface ExampleProps {
  id: string;
  title: string;
  description: React.ReactNode;
  buttonText: string;
  onClick: (hook: ZendeskContextValues) => void;
  timer?: number
}

export const Example: React.FC<ExampleProps> = ({
  title,
  description,
  buttonText,
  onClick,
  timer
}) => {
  const hook = useZendesk();

  function handleClick() {
    onClick(hook);
  }

//  useEffect(() => {
// if (typeof window.zE !== 'undefined') {
//   window.zE('messenger:on', 'open', () => {
//     console.log('Messenger widget was opened');
//   });
// }
//  })
  return (
    <section className="section">
      <div className="title">{title}</div>
      <div className="row-grid">
        <div>{description}</div>

        <div>
          <button className="button" onClick={handleClick}>
            {buttonText} {timer}
          </button>
        </div>
      </div>
    </section>
  );
};