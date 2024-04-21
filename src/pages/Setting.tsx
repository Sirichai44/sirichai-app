import { Grid, Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy';

const Setting = () => {
  return (
    <div className="flex items-center w-full h-full p-10 overflow-auto">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12 }}
        sx={{
          flexGrow: 1,
          border: '1px solid red',
          justifyContent: 'center',
          minHeight: 700
        }}>
        <Grid xs={10} md={6} xl={6}>
          <Tabs
            orientation="vertical"
            defaultValue={0}
            sx={{
              height: '100%',
              borderRadius: '8px',
              [`& .${tabClasses.root}`]: {
                fontSize: 'sm',
                fontWeight: 'lg',
                [`&[aria-selected="true"]`]: {
                  // color: 'var(--text-color)',
                  color: 'primary.500',
                  bgcolor: 'background.surface'
                },
                [`&.${tabClasses.focusVisible}`]: {
                  outlineOffset: '-4px'
                }
              }
            }}>
            <TabList>
              <span className="px-4 pb-2 my-3 text-xs border-b border-zinc-800 text-zinc-500">
                Setting
              </span>
              <Tab indicatorPlacement="left" variant="plain">
                User info
              </Tab>
              <Tab indicatorPlacement="left" variant="plain">
                Security
              </Tab>
              <Tab indicatorPlacement="left" variant="plain">
                Contacts
              </Tab>
            </TabList>

            <TabPanel value={0} sx={{ maxHeight: 480, overflowY: 'auto' }}>
              <Grid
                sx={{
                  border: '1px solid green'
                }}>
                asdasd
              </Grid>
            </TabPanel>
            <TabPanel value={1}>
              <b>Second</b> tab panel
            </TabPanel>
            <TabPanel value={2}>
              <b>Third</b> tab panel
            </TabPanel>
          </Tabs>
        </Grid>
      </Grid>
    </div>
  );
};

export default Setting;
