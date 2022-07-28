import { ReactChild, ReactFragment, ReactPortal } from "react";

export default function CenteredMetric(data: { centerX: string | number | undefined; centerY: string | number | undefined; }, total: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined){
  return (
    <text
      x={data.centerX}
      y={data.centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: '52px',
        fontWeight: 600,
      }}
    >
      {total}
    </text>
  )
}