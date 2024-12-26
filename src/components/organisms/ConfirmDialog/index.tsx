import Button from "@/components/atoms/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickAction: () => void;
};

export default function ConfirmDialog(props: Props) {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-[320px]">
        <h2>削除しますか？</h2>
        <div className="w-[150px] flex justify-between">
          <Button onClick={() => props.onClickAction()} value={"OK"} />
          <Button onClick={() => props.onClose()} value={"キャンセル"} />
        </div>
      </div>
    </div>
  );
}
