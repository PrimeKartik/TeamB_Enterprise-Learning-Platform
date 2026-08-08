import { Send } from "lucide-react";

export default function AIInput({
    value,
    onChange,
    onSend
}) {

    return (

        <div className="flex gap-2">

            <input
                className="flex-1 rounded-xl border border-white/10 bg-[#201233] p-3 text-white placeholder-gray-500 outline-none transition focus:border-[#EC4899]"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder="Ask AI Tutor..."
            />

            <button
                onClick={onSend}
                className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white px-5 rounded-xl font-bold shadow-md hover:opacity-90 transition cursor-pointer"
            >

                <Send size={18}/>

            </button>

        </div>

    );

}