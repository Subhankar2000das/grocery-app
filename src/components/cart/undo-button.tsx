"use client";

import { toast } from "sonner";
import { useCartStore } from "@/store/use-cart-store";

const UndoButton = () => {
  const lastAction = useCartStore((state) => state.lastAction);
  const undoLastAction = useCartStore((state) => state.undoLastAction);

  const handleUndo = () => {
    undoLastAction();
    toast.success("Last action undone");
  };

  if (!lastAction.type || !lastAction.item) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleUndo}
      className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
    >
      Undo Last Action
    </button>
  );
};

export default UndoButton;