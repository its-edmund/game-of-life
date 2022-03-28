import {
  Button,
  Center,
  Container,
  Group,
  Slider,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Node from "../Node";
import "./Grid.css";

const Grid = () => {
  const [grid, setGrid] = useState<boolean[][]>(
    Array.from({ length: 20 }, () => Array.from({ length: 50 }, () => false))
  );

  const [frameTime, setFrameTime] = useState(0);
  const [gridCounter, setGridCounter] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [paused, setPaused] = useState(true);
  const [mouseDown, setMouseDown] = useState(false);
  const [rightMouseDown, setRightMouseDown] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) {
        return;
      } else {
        setGridCounter((count) => (count + 1) % 200);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [speed, paused]);

  useEffect(() => {
    setGrid(nextStep(grid));
  }, [gridCounter]);

  useEffect(() => {
    const handleDocumentMouseUp = (event: any) => {
      if (event.button !== 2) {
        setTimeout(() => setMouseDown(false), 10);
      } else if (event.button === 2) {
        setTimeout(() => setMouseDown(false), 10);
        setTimeout(() => setRightMouseDown(false), 10);
      }
    };

    document.addEventListener("mouseup", handleDocumentMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  }, []);

  const handleNodeClick = () => {
    setMouseDown(true);
  };

  const handleNodeRightClick = () => {
    setRightMouseDown(true);
  };

  const counterNeighbors = (
    grid: boolean[][],
    r: number,
    c: number
  ): number => {
    let count = 0;
    for (
      let i = r - 1 >= 0 ? r - 1 : 0;
      i < (r + 2 < grid.length ? r + 2 : grid.length);
      i++
    ) {
      for (
        let j = c - 1 >= 0 ? c - 1 : 0;
        j < (c + 2 < grid[0].length ? c + 2 : grid[0].length);
        j++
      ) {
        if (i === r && j === c) {
          continue;
        }
        if (grid[i][j]) {
          count++;
        }
      }
    }
    return count;
  };

  const nextStep = (grid: boolean[][]): boolean[][] => {
    let newGrid = Array.from({ length: 20 }, () =>
      Array.from({ length: 10 }, () => false)
    );
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let count = counterNeighbors(grid, i, j);
        if (grid[i][j]) {
          if (count < 2) {
            newGrid[i][j] = false;
          } else if (count > 3) {
            newGrid[i][j] = false;
          } else {
            newGrid[i][j] = true;
          }
        } else {
          if (count === 3) {
            newGrid[i][j] = true;
          } else {
            newGrid[i][j] = false;
          }
        }
      }
    }

    return newGrid;
  };

  const setNode = (r: number, c: number): void => {
    let newGrid = [...grid];
    newGrid[r][c] = true;
    setGrid(newGrid);
  };

  const resetNode = (r: number, c: number): void => {
    let newGrid = [...grid];
    newGrid[r][c] = false;
    setGrid(newGrid);
  };

  return (
    <div>
      <Container>
        <Title className="title">Game of Life</Title>
        <Stack mb="md">
          <Stack spacing="sm">
            <Text style={{ color: "#424242" }}>Speed: </Text>
            <Slider
              min={10}
              max={400}
              value={410 - speed}
              onChange={(val) => {
                setSpeed(410 - val);
              }}
              size="lg"
            />
          </Stack>
          <Group grow>
            <Button
              onClick={() => {
                setPaused(true);
              }}
            >
              Pause
            </Button>
            <Button
              onClick={() => {
                setPaused(false);
              }}
            >
              Play
            </Button>
          </Group>
        </Stack>
        {grid.map((r, i) => {
          return (
            <div className="row" key={`${i}`}>
              {r.map((n, j) => {
                return (
                  <Node
                    kill={n}
                    r={i}
                    c={j}
                    set={setNode}
                    reset={resetNode}
                    key={`${n} ${j}`}
                    mouseDown={mouseDown}
                    rightMouseDown={rightMouseDown}
                    handleRightClick={handleNodeRightClick}
                    handleClick={handleNodeClick}
                  />
                );
              })}
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default Grid;
