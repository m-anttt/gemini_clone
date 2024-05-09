import { useContext } from "react";
import { Context } from "../../context/Context";
import './styles.scss'

const ResponseResult = () => {
  const { resultData } = useContext(Context);
  const paragraphs = resultData.split("\n");
  return (
    <div className="result-answer">
      {paragraphs.map((paragraph, index) => {
        if (paragraph.startsWith("##")) {
          return <h3 key={index}>{paragraph.replace("## ", "")}</h3>;
        } else if (paragraph.startsWith("###")) {
          return <h4 key={index}>{paragraph.replace("### ", "")}</h4>;
        } else if (paragraph.trim().startsWith("**")) {
          return (
            <p>
              <b>{paragraph.replace(/\*\*/g, "")}</b>
            </p>
          );
        } else if (paragraph.trim().startsWith("*")){
          paragraph = paragraph.replace("*", "")
          if (paragraph.indexOf("**") !== -1) {
            let paragraphParts = paragraph.split("**");
            return (
              <p>
                {paragraphParts.map((part, index) => {
                  if (index % 2 === 1) {
                    return <b>{part}</b>;
                  } else return part;
                })}
              </p>
            );
          } else {
            return <li>{paragraph}</li>;
          }
        }
        else {
          if (paragraph.indexOf("**") !== -1) {
            let paragraphParts = paragraph.split("**");
            return (
              <p>
                {paragraphParts.map((part, index) => {
                  if (index % 2 === 1) {
                    return <b>{part}</b>;
                  } else return part;
                })}
              </p>
            );
          } else return <p>{paragraph}</p>;
        }
      })}
    </div>
  );
};

export default ResponseResult;
