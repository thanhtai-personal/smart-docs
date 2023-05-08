import ReactModal from "@/components/Modal";
import ObjectModelDiagram from "@/components/ObjectModelDiagram";
import useModalHotkey from "@/hooks/useModalHotkey";
import { useEffect, useMemo, useRef, useState } from "react";
import defaultData from "./document.json";
import moment from "moment";
import JsonViewerComponent from "@/components/JsonViewer";
import { jsonViewerTheme } from "@/utils/constants";
import TooltipComponent from "@/components/Tooltip";

export default function Home() {
  const [jsonInputModalOpen, setJsonInputModalOpen] = useModalHotkey();
  const [jsonData, setJsonData] = useState("[]");
  const chartRef: any = useRef();
  const fileNameRef: any = useRef();

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
    const filename = fileNameRef.current.value
      ? `${fileNameRef.current.value}.json`
      : `${moment().format("DD-MM-YYYY")}_document.json`;

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

  const hanleImportJson = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader: any = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        setJsonData(reader.result);
      };
    }
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
          onOpenJson={setJsonInputModalOpen}
          openJson={jsonInputModalOpen}
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
            rows={15}
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
              marginTop: "16px",
              marginBottom: "16px",
              maxHeight: "35vh",
              overflow: "auto",
            }}
          >
            <JsonViewerComponent
              object={JSON.parse(jsonData)}
              theme={jsonViewerTheme}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <TooltipComponent
              tooltip={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "8px",
                    borderRadius: "4px",
                    boxShadow: "inset 2px 2px 4px rgba(0, 0, 255, .2)",
                    minWidth: 200,
                  }}
                >
                  <input ref={fileNameRef} placeholder="Enter file name" />
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
              }
              id={"export-json-file"}
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
            </TooltipComponent>
            <label
              className="button"
              style={{
                padding: "8px",
                background: "rgba(100, 155, 255)",
                borderRadius: "4px",
                margin: "8px",
                color: "#fff",
              }}
            >
              Import Json
              <input
                type="file"
                accept=".json"
                onChange={hanleImportJson}
                hidden
              />
            </label>
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
