"use client";
import { motion, AnimatePresence } from "framer-motion";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmModal({
  open,
  title = "تأكيد العملية",
  message = "هل أنت متأكد أنك تريد المتابعة؟",
  onClose,
  onConfirm,
}: ConfirmModalProps) {
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

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  onConfirm();
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
