function TranslatorStart({ onStart }) {
  return (
    <div className="w-full h-full flex flex-col p-6 justify-center items-center text-gray-800">
      <div className="w-full h-64 flex flex-col p-12 sm:p-12 rounded-t-full rounded-bl-full bg-gradient-to-r from-[#b6f492] to-[#338b93]">
        <span className="font-shojumaru text-5xl sm:text-6xl text-center">
          Hello
        </span>
        <span className="text-2xl sm:text-3xl text-center">नमस्ते</span>
        <span className="text-right text-3xl sm:text-4xl font-notoSansJP">
          你好
        </span>
        <span className="text-2xl xm:text-3xl text-right">HOLA</span>
      </div>

      <div className="flex flex-col space-y-5 mt-20 mb-36 justify-end items-end w-full">
        <span className="font-righteous text-4xl text-white uppercase">
          Translator App
        </span>
        <button
          className="font-righteous uppercase w-32 h-10 rounded-full bg-gradient-to-r from-[#b6f492] to-[#338b93]"
          onClick={onStart}
        >
          START
        </button>
      </div>
    </div>
  );
}

export default TranslatorStart;
