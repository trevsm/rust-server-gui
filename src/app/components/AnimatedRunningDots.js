import React from "react"

export const AnimatedRunningDots = () => {
  const [dotCount, setDotCount] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((dotCount) => (dotCount + 1) % 4)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        marginBottom: "6px",
      }}
    >
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          style={{
            opacity: i === dotCount ? 1 : 0.2,
            transition: "opacity 0.5s",
            fontSize: "20px",
            width: "3px",
            height: "3px",
            background: "rgba(0, 0, 0, 0.26)",
            borderRadius: "100%",
          }}
        />
      ))}
    </div>
  )
}
