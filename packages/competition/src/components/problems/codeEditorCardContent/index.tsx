import React from "react";
import { Button, Select, type OptionProps } from "@ui-aurora/react";
import CodeEditor from "../../codeEditor";
import styles from "./index.module.scss";
import { Scan } from "lucide-react";
import { useCodeEditor } from "../../../hooks/useCodeEditor";
import { useLanguageStore } from "../../../stores/useLanguageStore";
import { LanguageType } from "../../../types/language";

interface CodeEditorCardContentProps {
  setIsFullScreen: () => void;
}

const optionsList: OptionProps[] = [
  {
    value: 'C',
    label: 'C',
    key: 0,
  },
  // {
  //   value: "java",
  //   label: "java",
  //   key: 3,
  // },
  {
    value: "C++",
    label: "C++",
    key: 1,
  },
  {
    value: "C++98",
    label: "C++98",
    key: 2,
  },
  {
    value: "C++11",
    label: "C++11",
    key: 3,
  },
  {
    value: "C++11(O2)",
    label: "C++11(O2)",
    key: 4,
  },
  {
    value: "C++14",
    label: "C++14",
    key: 5,
  },
  {
    value: "C++14(O2)",
    label: "C++14(O2)",
    key: 6,
  },
  {
    value: "C++17",
    label: "C++17",
    key: 7,
  },
  {
    value: "C++17(O2)",
    label: "C++17(O2)",
    key: 8,
  },
  {
    value: "Bash",
    label: "Bash",
    key: 9,
  }
];

const findKeyByValue = (value: string): number => {
  const option = optionsList.find(option => option.value === value);
  return option ? option.key : 0; // 如果找不到匹配项，返回 null
};
export const CodeEditorCardContent: React.FC<CodeEditorCardContentProps> = ({
  setIsFullScreen,
}) => {
  const { handleCodeEditor, defaultValue } = useCodeEditor();
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const language = useLanguageStore((state) => state.language)

  const handleChange = (value: OptionProps) => {
    setLanguage(value.value as LanguageType);
  };

  return (
    <div className={styles["code-editor-container"]}>
      <div className={styles["code-editor-header"]}>
        <Select
          optionsList={optionsList}
          defaultSelectKey={findKeyByValue(language)}
          size="small"
          title="语言"
          placeHolder="请选择你的语言"
          onchange={handleChange}
        />
        <Button
          size="small"
          color="ghost"
          className={styles["full-screen"]}
          onClick={() => setIsFullScreen()}
        >
          <Scan size={16} />
        </Button>
      </div>
      <CodeEditor
        className={styles["code-editor"]}
        defaultValue={defaultValue}
        onUpdate={handleCodeEditor}
      />
    </div>
  );
};
