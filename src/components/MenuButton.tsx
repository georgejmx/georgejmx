type Props = {
  colour: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
};

export default function MenuButton(props: Props): JSX.Element {
  return (
    <button
      className={`text-${props.colour} bg-${props.isActive ? "[#080820] border-b-4" : "black"} font-bold py-2 px-4 mb-1 border rounded border-${props.colour} mr-2`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
