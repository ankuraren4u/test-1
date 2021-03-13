export const containerStyle = () => ({
  display: "flex",
  flex: "1",
  margin: "60px",
  flexDirection: "column",
  lineHeight: 2,
});

export const headerStyle = ({theme}) => ({
  backgroundColor: theme.backgroundGrey,
});

export const rowStyle = ({ theme }) => ({
  alignSelf: "center",
  display: "flex",
  width: "100%",
  border: `1px solid ${theme.headerColor}`,
  borderTop: 0,
  padding: "2px 10px",
  "&:first-of-type": {
    borderTop: "1px solid #000",
  },
});

export const valueStyle = () => ({
    flex: 1
})