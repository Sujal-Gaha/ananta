export const BouncingBallCanvas = () => {
  return (
    <div className="flex justify-center">
      <div className="relative aspect-video w-full max-w-4xl rounded-lg border bg-muted/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">
            Click the "Controls" button in the header to open the simulation
            controls.
          </p>
        </div>
      </div>
    </div>
  );
};
