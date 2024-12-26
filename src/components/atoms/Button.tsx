"use client";

type Props = {
  onClick: () => void;
  value: string;
  disable?: boolean;
};

export default function Button(props: Props) {
  return (
    <>
      <button
        className="bg-blue-500 p-2 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        onClick={props.onClick}
        disabled={props.disable}
      >
        {props.value}
      </button>
    </>
  );
}
