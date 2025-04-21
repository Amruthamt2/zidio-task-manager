const ProgressBar = ({ completed }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-6 shadow-inner">
        <div
          className="bg-green-500 h-6 rounded-full text-white text-sm flex items-center justify-center"
          style={`{width: ${completed}% }`}
        >
          {completed}%
        </div>
      </div>
    );
  };
  
  export default ProgressBar;