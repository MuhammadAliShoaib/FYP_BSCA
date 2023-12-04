import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Container, Grid } from '@mui/material';
import Header from '../components/Header';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const drawerWidth = 240;


const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Dashboard() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const date = new Date();
    const day = date.toLocaleString('en-US', { day: '2-digit' })
    const month = date.toLocaleString('en-US', { month: 'short' })
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" open={open} PaperProps={{
                sx: { backgroundColor: '#141925' }
            }}>
                <DrawerHeader>
                    {open ? <IconButton onClick={handleDrawerClose} style={{ color: 'white' }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton> : <IconButton onClick={handleDrawerOpen} style={{ color: 'white' }}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>}

                </DrawerHeader>
                <Divider />
                <List>
                    {['Home', 'Products', 'Batches', 'Create Batch', 'Track Batch'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block', color: 'white' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center', color: 'white'
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Header title='Dashboard' />
                {/* <DrawerHeader /> */}

                <Box sx={{ padding: '25px' }}>
                    {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="">
                            <h1>Dashboard</h1>
                        </div>
                        <div className="" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className=""><WbSunnyIcon /></div>
                            <div className="" style={{ marginRight: '10px' }}>{time}</div>
                            <div className="">{day + month}</div>
                        </div>
                    </Box> */}
                    <Container>
                        <Grid container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid item md={3} className='flexCenter' >
                                <div className='messagesDiv'>
                                    <p
                                        style={{
                                            fontFamily: "Poppins",
                                            fontWeight: 600,
                                            fontSize: 50,
                                            margin: 0
                                        }}
                                    >
                                        4
                                    </p>
                                    <div>New messages</div>
                                </div>
                            </Grid>
                            <Grid item md={3} className='flexCenter' >
                                <div className='messagesDiv'>
                                    <p
                                        style={{
                                            fontFamily: "Poppins",
                                            fontWeight: 600,
                                            fontSize: 50,
                                            margin: 0
                                        }}
                                    >
                                        4
                                    </p>
                                    <div>New messages</div>
                                </div>
                            </Grid>
                            <Grid item md={3} className='flexCenter' >
                                <div className='messagesDiv'>
                                    <p
                                        style={{
                                            fontFamily: "Poppins",
                                            fontWeight: 600,
                                            fontSize: 50,
                                            margin: 0
                                        }}
                                    >
                                        4
                                    </p>
                                    <div>New messages</div>
                                </div>
                            </Grid>
                            <Grid item md={3} className='flexCenter' >
                                <div className='messagesDiv'>
                                    <p
                                        style={{
                                            fontFamily: "Poppins",
                                            fontWeight: 600,
                                            fontSize: 50,
                                            margin: 0
                                        }}
                                    >
                                        4
                                    </p>
                                    <div>New messages</div>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container style={{ marginTop: '20px' }} >
                        <div style={{overflow: 'auto', maxHeight: '300px'}}>
                            <Grid container>
                                <Grid item md={12} style={{ backgroundColor: 'white', padding: '10px 15px 10px 15px',overflow:"hidden",minWidth:'500px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }} >
                                        <QueryStatsIcon style={{ marginRight: '10px' }} />
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis repellendus molestias tempora quis omnis consequuntur facere at autem doloremque. Sequi neque libero odio adipisci expedita nostrum ducimus cum quo minima.</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                    {/* <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                        neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                        tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                        tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                        posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography> */}
                </Box>
            </Box>
        </Box>
    );
}