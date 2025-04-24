import { useNavigate } from "react-router-dom";

const useCustomNavigate = () => {
  const navigate = useNavigate();

  return (path, isReplace = false) => {
    navigate(path, { replace: isReplace });
  };
};

export default useCustomNavigate;
