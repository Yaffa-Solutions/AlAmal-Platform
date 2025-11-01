"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  maxCount?: number;
  onClose: () => void;
  onConfirm: (count?: number) => void;
  showCountInput?: boolean;
};

export function ConfirmModal({
  open,
  title = "تأكيد العملية",
  message = "هل أنت متأكد أنك تريد المتابعة؟",
  maxCount = 1,
  onClose,
  onConfirm,
  showCountInput = false,
}: ConfirmModalProps) {
  const [count, setCount] = useState(1);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm text-center"
          >
            <h2 className="text-lg font-semibold text-[#1A2954] mb-2">
              {title}
            </h2>
            <p className="text-gray-700 mb-4">{message}</p>

            {showCountInput && (
              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-1 block">
                  عدد العناصر:
                </label>
                <input
                  type="number"
                  min={1}
                  max={maxCount}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  onConfirm(showCountInput ? count : undefined);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                تأكيد
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
