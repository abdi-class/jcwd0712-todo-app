"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeContext } from "@/contexts/ThemeContext";

interface ITodo {
  id: string;
  task: string;
  isDone: boolean;
}
const TodoPage = () => {
  // use context
  const { theme, setTheme } = useContext(ThemeContext);

  const inputTaskRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const onBtAdd = () => {
    if (inputTaskRef.current?.value) {
      // - Generate new ID
      const newID = new Date().getTime() + Math.random() * 10;
      // - Prepare newData
      const newData: ITodo = {
        id: newID.toString(),
        task: inputTaskRef.current.value,
        isDone: false,
      };
      // - Store data to state
      setTodos([...todos, newData]);
      // - Reset form input
      inputTaskRef.current.value = "";
    } else {
      alert("Isi form todo");
    }
  };

  const onBtDelete = (id: string) => {
    // Cara 1
    // setTodos(todos.filter((val: ITodo) => val.id !== id));

    // Cara 2
    const temp: ITodo[] = [...todos];
    const findIdx: number = temp.findIndex((val: ITodo) => val.id === id);
    temp.splice(findIdx, 1);
    setTodos(temp);
  };

  const onBtIsDone = (id: string) => {
    setTodos(
      todos.map((value: ITodo) => {
        if (value.id === id) {
          return { ...value, isDone: !value.isDone };
        } else {
          return value;
        }
      })
    );
  };

  const printData = () => {
    return todos.map((value: ITodo) => {
      return (
        <li
          key={value.id}
          className="flex justify-between items-center py-2 border-b"
        >
          <div className="flex items-center gap-4">
            <Checkbox
              checked={value.isDone}
              className="rounded-full w-6 h-6 border-2 border-gray-400"
              onClick={() => onBtIsDone(value.id)}
            />
            <span>{value.task}</span>
          </div>
          <Button
            type="button"
            className="p-0 w-8 h-8 rounded-full"
            onClick={() => onBtDelete(value.id)}
          >
            <Trash size={24} />
          </Button>
        </li>
      );
    });
  };

  const handleTheme = (): void => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div>
      <div
        className="w-full h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/light-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-transparent -z-40" />
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex justify-between w-[40rem]">
          <h1 className="text-4xl font-bold tracking-widest text-white">
            Todo
          </h1>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => {
              handleTheme();
            }}
          >
            {theme === "light" ? <Sun size={24} /> : <Moon size={24} />}
          </Button>
        </div>
      </div>

      <div className="w-[40rem] m-auto flex flex-col items-center">
        <Card className="w-full mt-[-50px] z-50 bg-white shadow-lg">
          <CardContent>
            <div className="relative">
              <Input
                type="text"
                placeholder="Create a new todo..."
                className="py-6 border-none shadow-none"
                ref={inputTaskRef}
              />
              <Button
                type="button"
                className="absolute top-1/7 right-4"
                onClick={onBtAdd}
              >
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full mt-4 shadow-lg">
          <CardContent className="p-5">
            <ul id="print">{printData()}</ul>

            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span>0 items left</span>
              <div className="space-x-3">
                <Button variant="link" type="button">
                  All
                </Button>
                <Button variant="link" type="button">
                  Done
                </Button>
                <Button variant="link" type="button">
                  Not Yet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoPage;
