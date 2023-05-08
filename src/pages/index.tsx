import ReactModal from "@/components/Modal";
import ObjectModelDiagram from "@/components/ObjectModelDiagram";
import useModalHotkey from "@/hooks/useModalHotkey";
import { useEffect, useMemo, useRef, useState } from "react";
import defaultData from "./document.json";
import moment from "moment";

export default function Home() {
  const [jsonInputModalOpen] = useModalHotkey();
  const [jsonData, setJsonData] = useState("[]");
  const chartRef = useRef();

  const handleJsonChange = (event: any) => {
    setJsonData(event.target.value);
  };

  const data = useMemo(() => {
    try {
      return JSON.parse(jsonData);
    } catch (error) {
      if (typeof alert === "function") {
        alert("Json format error!!!");
      }
      return [];
    }
  }, [jsonData]);

  useEffect(() => {
    setJsonData(JSON.stringify(defaultData));
  }, []);

  const handleUpdateJson = (data: any) => {
    setJsonData(JSON.stringify(data));
  };

  const handleExportJson = () => {
    const filename = `${moment().format("DD-MM-YYYY")}_document.json`;

    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(jsonData)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <main>
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          fontFamily: "sans-serif",
        }}
      >
        <ObjectModelDiagram
          ref={chartRef}
          nodes={data.nodes}
          edges={data.edges}
          onUpdateJson={handleUpdateJson}
        />
      </div>
      <ReactModal isOpen={jsonInputModalOpen}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: 1250,
          }}
        >
          <textarea
            value={jsonData}
            rows={20}
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "solid 1px rgba(0,0,0, 0.125)",
              padding: "8px",
            }}
            onChange={handleJsonChange}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <button
              style={{
                padding: "8px",
                background: "rgba(100, 155, 255)",
                borderRadius: "4px",
                margin: "8px",
                color: "#fff",
              }}
              onClick={handleExportJson}
            >
              Export Json
            </button>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            Format Json&nbsp;
            <a
              style={{
                color: "steelblue",
                textDecoration: "underline",
              }}
              href="https://jsoneditoronline.org/"
              target="_blank"
            >
              here
            </a>
          </div>
        </div>
      </ReactModal>
    </main>
  );
}
