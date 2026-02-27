import logo from '../assets/img/arrow-right.png'
export const CardList = ({ name, lastName, onClick,key }) => {
  return (
    <div
      onClick={onClick}
      className="h-[50px] w-full flex items-center p-2 rounded-xl mt-2 shadow cursor-pointer bg-gray-200 hover:bg-gray-100 transition"
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-bold text-xs text-gray-800">
            {name} {lastName} 
        </span>
        

        <img
            src={logo}
            alt="User"
            className="w-5 h-5"
        />
        </div>
    </div>
  );
};