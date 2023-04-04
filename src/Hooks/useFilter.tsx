import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from 'query-string';

function useFilter(filter?: {[property: string]: string} | null) {
  const navigate = useNavigate();
  useEffect(() => {
    if(filter) {
      const queryStringg = queryString.stringify(filter);
      
      if(queryStringg !== window.location.search.substring(1))
        navigate(`?${queryStringg}`)
    } else if(filter === null) {
      if(window.location.search !== "")
        navigate('');
    }
  });

  return window.location.search.substring(1);
}

export default useFilter;