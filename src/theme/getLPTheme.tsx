import type {} from "@mui/material/themeCssVarsAugmentation";
import { ThemeOptions, alpha } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

declare module "@mui/material/styles/createPalette" {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}
}

export const brand = {
  50: "#F0F7FF",
  100: "#CEE5FD",
  200: "#9CCCFC",
  300: "#55A6F6",
  400: "#0A66C2",
  500: "#0959AA",
  600: "#064079",
  700: "#033363",
  800: "#02294F",
  900: "#021F3B",
};

export const secondary = {
  50: "#F9F0FF",
  100: "#E9CEFD",
  200: "#D49CFC",
  300: "#B355F6",
  400: "#750AC2",
  500: "#6709AA",
  600: "#490679",
  700: "#3B0363",
  800: "#2F024F",
  900: "#23023B",
};

export const gray = {
  50: "#FBFCFE",
  100: "#EAF0F5",
  200: "#D6E2EB",
  300: "#BFCCD9",
  400: "#94A6B8",
  500: "#5B6B7C",
  600: "#4C5967",
  700: "#364049",
  800: "#131B20",
  900: "#090E10",
};

export const green = {
  50: "#F6FEF6",
  100: "#E3FBE3",
  200: "#C7F7C7",
  300: "#A1E8A1",
  400: "#51BC51",
  500: "#1F7A1F",
  600: "#136C13",
  700: "#0A470A",
  800: "#042F04",
  900: "#021D02",
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      light: brand[200],
      main: brand[500],
      dark: brand[800],
      contrastText: brand[50],
      ...(mode === "dark" && {
        contrastText: brand[100],
        light: brand[300],
        main: brand[400],
        dark: brand[800],
      }),
    },
    secondary: {
      light: secondary[300],
      main: secondary[500],
      dark: secondary[800],
      ...(mode === "dark" && {
        light: secondary[400],
        main: secondary[500],
        dark: secondary[900],
      }),
    },
    warning: {
      main: "#F7B538",
      dark: "#F79F00",
      ...(mode === "dark" && { main: "#F7B538", dark: "#F79F00" }),
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
      ...(mode === "dark" && {
        light: "#D32F2F",
        main: "#D32F2F",
        dark: "#B22A2A",
      }),
    },
    success: {
      light: green[300],
      main: green[400],
      dark: green[800],
      ...(mode === "dark" && {
        light: green[400],
        main: green[500],
        dark: green[700],
      }),
    },
    grey: {
      50: gray[50],
      100: gray[100],
      200: gray[200],
      300: gray[300],
      400: gray[400],
      500: gray[500],
      600: gray[600],
      700: gray[700],
      800: gray[800],
      900: gray[900],
    },
    divider: mode === "dark" ? alpha(gray[600], 0.3) : alpha(gray[300], 0.5),
    background: {
      default: "#fff",
      paper: gray[50],
      ...(mode === "dark" && { default: gray[900], paper: "white" }),
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
      ...(mode === "dark" && { primary: "#fff", secondary: gray[400] }),
    },
    action: {
      selected: `${alpha(brand[200], 0.2)}`,
      ...(mode === "dark" && {
        selected: alpha(brand[800], 0.2),
      }),
    },
  },
  typography: {
    fontFamily: ['"Inter", "sans-serif"'].join(","),
    h1: {
      fontSize: 60,
      fontWeight: 600,
      lineHeight: 78 / 70,
      letterSpacing: -0.2,
    },
    h2: {
      fontSize: 48,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 42,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 34,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 16,
    },
    body1: {
      fontWeight: 400,
      fontSize: 15,
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
    },
    caption: {
      fontWeight: 400,
      fontSize: 12,
    },
  },
});

export default function getLPTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: mode === "dark" ? brand[300] : undefined,
          },
        },
      },
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
          disableGutters: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            padding: 8,
            overflow: "clip",
            backgroundColor: "#fff",
            border: "1px solid",
            borderColor: gray[100],
            ":before": {
              backgroundColor: "transparent",
            },
            "&:first-of-type": {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
            "&:last-of-type": {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            },
            ...(theme.palette.mode === "dark" && {
              backgroundColor: gray[900],
              borderColor: gray[800],
            }),
          }),
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: "none",
            borderRadius: 8,
            "&:hover": { backgroundColor: gray[100] },
            ...(theme.palette.mode === "dark" && {
              "&:hover": { backgroundColor: gray[800] },
            }),
          }),
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { mb: 20, border: "none" },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: "10px",
            boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
            "& .Mui-selected": {
              color: brand[500],
            },
            ...(theme.palette.mode === "dark" && {
              "& .Mui-selected": {
                color: "#fff",
              },
              boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
            }),
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: "12px 16px",
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 500,
            ...(theme.palette.mode === "dark" && {
              color: gray[400],
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
              "&.Mui-selected": { color: brand[300] },
            }),
          }),
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            boxSizing: "border-box",
            transition: "all 100ms ease-in",
            "&:focus-visible": {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: "2px",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            backgroundColor: gray[50],
            borderRadius: 10,
            border: `1px solid ${alpha(gray[200], 0.8)}`,
            boxShadow: "none",
            transition: "background-color, border, 80ms ease",
            ...(ownerState.variant === "outlined" && {
              background: `linear-gradient(to bottom, #FFF, ${gray[50]})`,
              "&:hover": {
                borderColor: brand[300],
                boxShadow: `0 0 24px ${brand[100]}`,
              },
            }),
            ...(theme.palette.mode === "dark" && {
              backgroundColor: alpha(gray[800], 0.6),
              border: `1px solid ${alpha(gray[700], 0.3)}`,
              ...(ownerState.variant === "outlined" && {
                background: `linear-gradient(to bottom, ${gray[900]}, ${alpha(
                  gray[800],
                  0.5
                )})`,
                "&:hover": {
                  borderColor: brand[700],
                  boxShadow: `0 0 24px ${brand[800]}`,
                },
              }),
            }),
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            alignSelf: "center",
            py: 1.5,
            px: 0.5,
            background: `linear-gradient(to bottom right, ${brand[50]}, ${brand[100]})`,
            border: "1px solid",
            borderColor: `${alpha(brand[500], 0.3)}`,
            fontWeight: "600",
            "&:hover": {
              backgroundColor: brand[500],
            },
            "&:focus-visible": {
              borderColor: brand[800],
              backgroundColor: brand[200],
            },
            "& .MuiChip-label": {
              color: brand[500],
            },
            "& .MuiChip-icon": {
              color: brand[500],
            },
            ...(theme.palette.mode === "dark" && {
              background: `linear-gradient(to bottom right, ${brand[700]}, ${brand[900]})`,
              borderColor: `${alpha(brand[500], 0.5)}`,
              "&:hover": {
                backgroundColor: brand[600],
              },
              "&:focus-visible": {
                borderColor: brand[200],
                backgroundColor: brand[600],
              },
              "& .MuiChip-label": {
                color: brand[200],
              },
              "& .MuiChip-icon": {
                color: brand[200],
              },
            }),
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: `${alpha(gray[200], 0.8)}`,
            ...(theme.palette.mode === "dark" && {
              borderColor: `${alpha(gray[700], 0.4)}`,
            }),
          }),
        },
      },

      MuiLink: {
        defaultProps: {
          underline: "none",
        },
        styleOverrides: {
          root: ({ theme }) => ({
            color: brand[600],
            fontWeight: 500,
            position: "relative",
            textDecoration: "none",
            "&::before": {
              content: '""',
              position: "absolute",
              width: 0,
              height: "1px",
              bottom: 0,
              left: 0,
              backgroundColor: brand[200],
              opacity: 0.7,
              transition: "width 0.3s ease, opacity 0.3s ease",
            },
            "&:hover::before": {
              width: "100%",
              opacity: 1,
            },
            ...(theme.palette.mode === "dark" && {
              color: brand[200],
            }),
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: "99px",
            color: gray[500],
            fontWeight: 500,
            ...(theme.palette.mode === "dark" && {
              color: "white",
              backgroundColor: gray[800],
            }),
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: "none",
            backgroundColor: gray[100],
            ...(theme.palette.mode === "dark" && {
              backgroundColor: alpha(gray[900], 1),
            }),
          }),
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxSizing: "border-box",
            width: 36,
            height: 24,
            padding: 0,
            transition: "background-color 100ms ease-in",
            "&:hover": {
              "& .MuiSwitch-track": {
                backgroundColor: brand[600],
              },
            },
            "& .MuiSwitch-switchBase": {
              "&.Mui-checked": {
                transform: "translateX(13px)",
              },
            },
            "& .MuiSwitch-track": {
              borderRadius: 50,
            },
            "& .MuiSwitch-thumb": {
              boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#FFF",
              width: 16,
              height: 16,
              margin: 2,
            },
            ...(theme.palette.mode === "dark" && {
              width: 36,
              height: 24,
              padding: 0,
              transition: "background-color 100ms ease-in",
              "&:hover": {
                "& .MuiSwitch-track": {
                  backgroundColor: brand[600],
                },
              },
              "& .MuiSwitch-switchBase": {
                "&.Mui-checked": {
                  transform: "translateX(13px)",
                },
              },
              "& .MuiSwitch-thumb": {
                boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#FFF",
                width: 16,
                height: 16,
                margin: 2,
              },
            }),
          }),
          switchBase: {
            height: 24,
            width: 24,
            padding: 0,
            color: "#fff",
            "&.Mui-checked + .MuiSwitch-track": {
              opacity: 1,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            "& label .Mui-focused": {
              color: "white",
            },
            "& .MuiInputBase-input": {
              color: "black",
              "&::placeholder": {
                opacity: 0.7,
              },
            },
            "& .MuiOutlinedInput-root": {
              minWidth: 280,
              minHeight: 40,
              height: "100%",
              borderRadius: "5px",
              border: "1px solid",
              borderColor: gray[400],
              transition: "border-color 120ms ease-in",
              "& fieldset": {
                border: "none",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              },
              "&:hover": {
                borderColor: brand[300],
              },
              "&.Mui-focused": {
                borderColor: brand[400],
                outline: "4px solid",
                outlineColor: brand[200],
              },
            },
            "& .MuiSelect-select": {
              color: "black",
            },
            "& input:-webkit-autofill": {
              "-webkit-text-fill-color": "black",
              WebkitBoxShadow: "0 0 0 1000px #FFF inset",
            },
            ...(theme.palette.mode === "dark" && {
              "& .MuiOutlinedInput-root": {
                boxSizing: "border-box",
                color: "red",
                minWidth: 280,
                minHeight: 40,
                height: "100%",
                borderRadius: "5px",
                border: "1px solid",
                borderColor: gray[600],
                transition: "border-color 120ms ease-in",
                "& fieldset": {
                  border: "none",
                },
                "&:hover": {
                  borderColor: brand[300],
                },
                "&.Mui-focused": {
                  borderColor: brand[400],
                  outline: "4px solid",
                  outlineColor: alpha(brand[500], 0.5),
                },
              },
              "& input:-webkit-autofill": {
                "-webkit-text-fill-color": "black",
                WebkitBoxShadow: "0 0 0 1000px #FFF inset",
              },

              "& .MuiSelect-select": {
                color: "black",
              },
            }),
          }),
        },
      },
    },
  };
}
