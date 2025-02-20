'use client';

/**
 * フォームフィールドコンポーネント
 * @param {Object} props
 * @param {string} props.id - フィールドのID
 * @param {string} props.label - ラベル
 * @param {string} [props.type="text"] - 入力タイプ
 * @param {string} [props.placeholder] - プレースホルダー
 * @param {boolean} [props.required=false] - 必須項目かどうか
 * @param {boolean} [props.disabled=false] - 無効化されているかどうか
 * @param {string} [props.error] - エラーメッセージ
 * @param {Object} props.register - react-hook-formのregister関数
 */
export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  error,
  register,
  ...props
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          className={`
            w-full p-2 border rounded-md transition-colors duration-200
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100' : 'bg-white'}
            focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
          {...register(id)}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={`
            w-full p-2 border rounded-md transition-colors duration-200
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100' : 'bg-white'}
            focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
          placeholder={placeholder}
          disabled={disabled}
          {...register(id)}
          {...props}
        />
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 