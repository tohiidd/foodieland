function EditorButton({ children, ...resProps }: any) {
  return (
    <button
      className="p-2 border rounded-sm max-h-[32px] flex items-center hover:shadow-[1px_1px_0px_#bfbdbd]"
      {...resProps}
    >
      {children}
    </button>
  );
}

export default EditorButton;
