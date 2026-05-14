//import { useNavigate } from 'react-router';
import { Button } from './ui/button';

type MessageProps = {
  text1: string;
  email?: string;
  text2?: string;
  button?: React.ReactNode;
  link?: string;
};

export function Message(props: MessageProps): React.ReactElement {
  //const navigate = useNavigate();

  return (
    <>
      <div className="space-y-2">
        <p className="text-muted-foreground">
          {props.text1}
          {props.email && (
            <a
              href={`mailto:${props.email}`}
              className="text-primary hover:underline font-medium mx-1"
            >
              {props.email}
            </a>
          )}
          {props.email && '.'}
        </p>
        {props.text2 && <p className="text-muted-foreground">{props.text2}</p>}
      </div>

      {props.link && (
        <Button
          onClick={() => {
            console.log('home');
          }}
        >
          {props.button}
        </Button>
      )}
    </>
  );
}
