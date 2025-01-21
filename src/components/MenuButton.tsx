type Props = {
  colour: string;
  text: string;
  onClick: () => void;
};

const HOVER_COLOUR = "#360202";

export default function MenuButton(props: Props): JSX.Element {
  return (
    <button
      className={`text-${props.colour} bg-black font-bold font-mono py-2 px-4 mb-1 border rounded border-b-4 border-${props.colour} hover:bg-[${HOVER_COLOUR}] mr-2`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
