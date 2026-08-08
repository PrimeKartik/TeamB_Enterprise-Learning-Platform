export default function AIMessage({ role, message }) {

    return (

        <div
            className={`rounded-xl p-4 text-sm font-medium ${
                role === "user"
                    ? "bg-gradient-to-r from-[#7C3AED]/40 to-[#EC4899]/40 border border-[#EC4899]/40 text-white ml-8"
                    : "bg-[#201233] border border-white/10 text-purple-100 mr-8"
            }`}
        >

            {message}

        </div>

    );

}