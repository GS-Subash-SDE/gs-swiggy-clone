import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);
  useEffect(() => {
    window.addEventListener('online', () => {
      setOnlineStatus(true)
      console.log('online!');
    });
    window.addEventListener('offline', () => {
      setOnlineStatus(false)
      console.log('Offline!');
    });
    
  }, []);
  
  return onlineStatus;
}

export default useOnlineStatus;