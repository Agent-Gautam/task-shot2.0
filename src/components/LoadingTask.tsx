const LoadingTask = () => {
  return (
    <div>
      <div className="break-inside-avoid relative w-full h-auto rounded-md p-3 pl-6 flex flex-col gap-3 min-h-[100px] max-w-[500px] bg-white/30 backdrop-blur-lg">
        <div
          className={`absolute left-2 top-0 w-2 h-full bg-black/50 rounded-full animate-pulse`}
        />
        <div id="upper-row" className="w-full flex flex-col gap-1">
          <p className="w-[80%] h-5 bg-black/50 rounded-full animate-pulse"></p>
          <p className="h-5 bg-black/50 rounded-full w-[50%] animate-pulse"></p>
        </div>
        <div id="lower-row" className="flex justify-between items-center">
          <div id="left" className="flex gap-2 items-center">
            <h1 className="w-6 h-6 rounded-full bg-black/50 animate-pulse"></h1>
            <div className="bg-black/50 w-24 h-8 rounded-lg py-1 px-3 flex animate-pulse">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingTask
