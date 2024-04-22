import { Card, Grid, Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy';

import useFormReact from '@/hook/useFormReact';
import { UserInfoSchema } from './components/schema/UserInfoSchema';
import { useAppSelector } from '@/store/store';
import useResponsiveWidth from '@/hook/useResponsiveWidth';

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import moment from 'moment';

const Setting = () => {
  const Form = useFormReact(UserInfoSchema);
  const { profile, currentInfo } = useAppSelector((state) => ({
    profile: state.auth.profile,
    currentInfo: state.auth.current_info
  }));
  const { md, lg } = useResponsiveWidth();
  // const key = 'e1709d64b4e5713535d0f73c908df6ae';

  const info = useAppSelector((state) => state.auth.current_info);
  console.log('info---', info);

  const basicInfo = [
    {
      nameField: 'username',
      type: 'text',
      defaultValue: profile.username
    },
    {
      nameField: 'Birthday',
      type: 'text',
      defaultValue: moment().format('MMM DD, YYYY')
    },
    {
      nameField: 'gender',
      type: 'text',
      defaultValue: 'Male'
    }
  ];

  const contactsInfo = [
    {
      nameField: 'email',
      type: 'text',
      defaultValue: profile.email
    },
    {
      nameField: 'phone',
      type: 'text',
      defaultValue: '012 345 6789'
    }
  ];

  const addressInfo = [
    {
      nameField: 'Home',
      type: 'text',
      defaultValue: '123 Street, City, Country'
    },
    {
      nameField: 'Work',
      type: 'text',
      defaultValue: 'Not set'
    }
  ];

  const secureInfo = [
    {
      nameField: `new sign-in on ${currentInfo.system}`,
      type: 'text',
      defaultValue: `Apr 16 ${currentInfo.weather.system.name}, ${currentInfo.weather.system.country}`
    }
  ];
  return (
    <div className="flex items-center w-full h-full p-10 overflow-auto">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12 }}
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          minHeight: 700
        }}>
        <Grid xs={12} md={10} lg={8} xl={8}>
          <Tabs
            orientation={md ? 'vertical' : 'horizontal'}
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
            <TabList sx={{ width: `${lg ? '25%' : md ? '35%' : 'auto'}` }}>
              <span
                className={`px-4 pb-2 ${md ? 'my-3 border-b' : 'mt-3'} text-xs dark:border-zinc-800 border-zinc-300 text-zinc-500`}>
                Setting
              </span>
              <Tab indicatorPlacement={md ? 'right' : 'bottom'} variant="plain">
                User info
              </Tab>
              <Tab indicatorPlacement={md ? 'right' : 'bottom'} variant="plain">
                Security
              </Tab>
              <Tab indicatorPlacement={md ? 'right' : 'bottom'} variant="plain">
                Contacts
              </Tab>
            </TabList>

            <TabPanel value={0} sx={{ maxHeight: 680, overflowY: 'auto' }}>
              <Card sx={{ width: '100%', marginBottom: '16px' }}>
                <span className="">Basic Info</span>
                <Grid
                  container
                  sx={{
                    // border: '1px solid red',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  {basicInfo.map((item) => (
                    <a
                      key={'setting-' + item.nameField}
                      className="flex justify-between py-3 border-b cursor-pointer dark:border-zinc-800 border-zinc-300 hover:bg-gray-100 hover:border-gray-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
                      <div className="flex">
                        <span className="text-sm font-light w-60">{item.nameField}</span>
                        <span style={{ fontSize: '14px' }}>{item.defaultValue}</span>
                      </div>

                      <ArrowForwardIosRoundedIcon />
                    </a>
                  ))}
                </Grid>
              </Card>

              <Card sx={{ width: '100%', marginBottom: '16px' }}>
                <span className="">Contacts Info</span>
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  {contactsInfo.map((item) => (
                    <a
                      key={'setting-' + item.nameField}
                      className="flex justify-between py-3 border-b cursor-pointer dark:border-zinc-800 border-zinc-300 hover:bg-gray-100 hover:border-gray-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
                      <div className="flex">
                        <span className="text-sm font-light w-60">{item.nameField}</span>
                        <span style={{ fontSize: '14px' }}>{item.defaultValue}</span>
                      </div>

                      <ArrowForwardIosRoundedIcon />
                    </a>
                  ))}
                </Grid>
              </Card>

              <Card sx={{ width: '100%', marginBottom: '16px' }}>
                <span className="">Addresses</span>
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  {addressInfo.map((item) => (
                    <a
                      key={'setting-' + item.nameField}
                      className="flex justify-between py-3 border-b cursor-pointer dark:border-zinc-800 border-zinc-300 hover:bg-gray-100 hover:border-gray-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
                      <div className="flex">
                        <span className="text-sm font-light w-60">{item.nameField}</span>
                        <span style={{ fontSize: '14px' }}>{item.defaultValue}</span>
                      </div>

                      <ArrowForwardIosRoundedIcon />
                    </a>
                  ))}
                </Grid>
              </Card>
            </TabPanel>
            <TabPanel value={1}>
              <Card sx={{ width: '100%', marginBottom: '16px' }}>
                <span className="">Recent security activity</span>
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  {secureInfo.map((item) => (
                    <a
                      key={'setting-' + item.nameField}
                      className="flex justify-between py-3 border-b cursor-pointer dark:border-zinc-800 border-zinc-300 hover:bg-gray-100 hover:border-gray-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
                      <div className="flex">
                        <span className="text-sm font-light w-60">{item.nameField}</span>
                        <span style={{ fontSize: '14px' }}>{item.defaultValue}</span>
                      </div>

                      <ArrowForwardIosRoundedIcon />
                    </a>
                  ))}
                </Grid>
              </Card>
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
