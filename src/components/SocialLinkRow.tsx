type Props = {
  imageSrc: string;
  linkTarget: string;
  text: string;
};

export default function SocialLinkRow(props: Props): JSX.Element {
  return (
    <tr>
      <td>
        <img
          alt={`${props} company logo`}
          src={props.imageSrc}
          className="w-4"
        />
      </td>
      <td>
        <a
          href={props.linkTarget}
          className="font-mono text-yellow-200 hover:text-yellow-500"
        >
          {props.text}
        </a>
      </td>
    </tr>
  );
}
