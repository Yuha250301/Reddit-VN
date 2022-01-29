import React, { useRef } from "react";
import { useVirtual } from "react-virtual";
export default function RowVirtualizerDynamic({ rows }: { rows: any[] }) {
  const parentRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
  });

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `200px`,
          width: `400px`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: rowVirtualizer.totalSize,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div style={{ height: rows[virtualRow.index] }}>
                Row {virtualRow.index}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
