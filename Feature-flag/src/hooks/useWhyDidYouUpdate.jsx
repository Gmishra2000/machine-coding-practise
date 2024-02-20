import { useEffect, useRef } from "react";

const useWhyDidYouUpate = (name, props) => {
  const prevProps = useRef();

  useEffect(() => {
    if (prevProps.current) {
      const keys = Object.keys({ ...prevProps.current, ...props });

      const whyUpated = {};

      keys.forEach((key) => {
        if (
          typeof prevProps.current[key] === "object" &&
          props[key] === "object"
        ) {
          if (
            JSON.stringify(prevProps.current[key]) !==
            JSON.stringify(props[key])
          ) {
            whyUpated[key] = {
              from: prevProps.current[key],
              to: props[key]
            };
          }
        } else {
          if (prevProps.current[key] !== props[key]) {
            whyUpated[key] = {
              from: prevProps.current[key],
              to: props[key]
            };
          }
        }
      });

      if (Object.keys(whyUpated).length) {
        console.log("This has caused re-render", whyUpated);
      }
    }

    prevProps.current = props;
  }, [name, props]);
};

export default useWhyDidYouUpate;
