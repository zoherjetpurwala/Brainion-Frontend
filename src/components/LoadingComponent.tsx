const LoadingComponent: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <h1 className="font-semibold flex flex-col justify-center items-center">
        <span>Rendering patience...</span>
        <span>Because great things (and servers) take time! ⏳</span>
      </h1>
    </div>
  );
};

export default LoadingComponent;
