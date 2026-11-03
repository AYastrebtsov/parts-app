import { useForm, Controller } from "react-hook-form";
import { debounce } from "./debounce";

import {
    Box,
    Typography,
    Button,
    TextField,
    Skeleton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Snackbar,
    Alert,
} from "@mui/material";

import { useGetManufacturerMutation } from "./api";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function App() {
    const [
        loadManufacturer,
        { data, isLoading, isSuccess, isUninitialized, isError, error },
    ] = useGetManufacturerMutation();

    const { control, handleSubmit, getValues } = useForm({
        defaultValues: {
            number: "",
        },
    });

    const debouncedManufacturerFieldSubmit = debounce((evt) => {
        loadManufacturer({ number: evt.target.value });
    }, 1000);

    return (
        <>
            <Box
                sx={(theme) => ({
                    maxWidth: "800px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    rowGap: "16px",
                    margin: "0 auto",
                    border: "2px solid",
                    borderColor: theme.palette.primary.main,
                    borderRadius: "15px",
                    padding: "20px",
                    marginTop: "20px",
                    marginBottom: "20px",
                })}
            >
                <Typography
                    component="h1"
                    sx={{
                        fontSize: "28px",
                        lineHeight: "32px",
                        fontWeight: "bold",
                    }}
                >
                    Подбор автозапчастей
                </Typography>

                <form
                    id="request-manufacturer"
                    onSubmit={handleSubmit((values) => {
                        console.log(values);
                    })}
                >
                    <Controller
                        name="number"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Введите артикул автозапчасти"
                                onChange={(event) => {
                                    field.onChange(event);
                                    debouncedManufacturerFieldSubmit(event);
                                }}
                                sx={{
                                    width: "100%",
                                }}
                            />
                        )}
                    />
                </form>

                {!isUninitialized ? (
                    <Box>
                        <Typography
                            component="h2"
                            sx={{
                                fontSize: "18px",
                                lineHeight: "22px",
                                fontWeight: "bold",
                            }}
                        >
                            Найденные производители
                        </Typography>

                        {isLoading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    rowGap: "12px",
                                }}
                            >
                                <Skeleton variant="rectangular" height={48} />
                                <Skeleton variant="rectangular" height={48} />
                                <Skeleton variant="rectangular" height={48} />
                                <Skeleton variant="rectangular" height={48} />
                                <Skeleton variant="rectangular" height={48} />
                                <Skeleton variant="rectangular" height={48} />
                                <Skeleton variant="rectangular" height={48} />
                                <Skeleton variant="rectangular" height={48} />
                                <Skeleton variant="rectangular" height={48} />
                            </Box>
                        ) : null}

                        {isError ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    paddingTop: "20px",
                                    paddingBottom: "20px",
                                    rowGap: "20px",
                                }}
                            >
                                <SentimentVeryDissatisfiedIcon
                                    sx={(theme) => ({
                                        fontSize: "60px",
                                        color: theme.palette.primary.dark,
                                    })}
                                />
                                <Typography
                                    component="h2"
                                    sx={{
                                        fontSize: "16px",
                                        lineHeight: "18px",
                                    }}
                                >
                                    Поиск завершился неудачно или произошла
                                    ошибка
                                </Typography>
                            </Box>
                        ) : null}

                        {isSuccess
                            ? data.goods.map((item, index) => (
                                  <Accordion key={item.price + index}>
                                      <AccordionSummary id={item.goodsID}>
                                          <Typography component="span">
                                              {item.brand}
                                          </Typography>
                                      </AccordionSummary>
                                      <AccordionDetails
                                          sx={{
                                              display: "grid",
                                              rowGap: "8px",
                                          }}
                                      >
                                          <Box
                                              sx={{
                                                  display: "flex",
                                                  justifyContent:
                                                      "space-between",
                                              }}
                                          >
                                              <Typography
                                                  component="p"
                                                  sx={{
                                                      fontWeight: "bold",
                                                      fontSize: "14px",
                                                      lineHeight: "16px",
                                                  }}
                                              >
                                                  Название
                                              </Typography>
                                              <Typography
                                                  component="p"
                                                  sx={{
                                                      fontSize: "14px",
                                                      lineHeight: "16px",
                                                      textAlign: 'right'
                                                  }}
                                              >
                                                  {item.name}
                                              </Typography>
                                          </Box>
                                          <Divider />
                                          <Box
                                              sx={{
                                                  display: "flex",
                                                  justifyContent:
                                                      "space-between",
                                              }}
                                          >
                                              <Typography
                                                  component="p"
                                                  sx={{
                                                      fontWeight: "bold",
                                                      fontSize: "14px",
                                                      lineHeight: "16px",
                                                  }}
                                              >
                                                  Количество
                                              </Typography>
                                              <Typography
                                                  component="p"
                                                  sx={{
                                                      fontSize: "14px",
                                                      lineHeight: "16px",
                                                  }}
                                              >
                                                  {item.count}
                                              </Typography>
                                          </Box>
                                          <Divider />
                                          <Box
                                              sx={{
                                                  display: "flex",
                                                  justifyContent:
                                                      "space-between",
                                              }}
                                          >
                                              <Typography
                                                  component="p"
                                                  sx={{
                                                      fontWeight: "bold",
                                                      fontSize: "14px",
                                                      lineHeight: "16px",
                                                  }}
                                              >
                                                  Цена
                                              </Typography>
                                              <Typography
                                                  component="p"
                                                  sx={{
                                                      fontSize: "14px",
                                                      lineHeight: "16px",
                                                  }}
                                              >
                                                  {item.price} ₽
                                              </Typography>
                                          </Box>

                                          {data.goods.length > 1 ? (
                                              <Button
                                                  variant="contained"
                                                  onClick={() => {
                                                      loadManufacturer({
                                                          number: getValues(
                                                              "number",
                                                          ),
                                                          brand: item.brand,
                                                          analogues: "on",
                                                      });
                                                  }}
                                              >
                                                  Показать аналоги и предложения
                                              </Button>
                                          ) : null}

                                          {item.analogues ? (
                                              <Box>
                                                  <Typography
                                                      component="h2"
                                                      sx={{
                                                          fontSize: "18px",
                                                          lineHeight: "22px",
                                                          fontWeight: "bold",
                                                          textAlign: "center",
                                                      }}
                                                  >
                                                      Аналоги
                                                  </Typography>{" "}
                                                  {item.analogues.map(
                                                      (analog) => (
                                                          <Accordion
                                                              key={
                                                                  analog.goodsID
                                                              }
                                                          >
                                                              <AccordionSummary
                                                                  id={
                                                                      analog.goodsID
                                                                  }
                                                              >
                                                                  <Typography component="span">
                                                                      {
                                                                          analog.name
                                                                      }
                                                                  </Typography>
                                                              </AccordionSummary>

                                                              <AccordionDetails
                                                                  sx={{
                                                                      display:
                                                                          "grid",
                                                                      rowGap: "8px",
                                                                  }}
                                                              >
                                                                  <Box
                                                                      sx={{
                                                                          display:
                                                                              "flex",
                                                                          justifyContent:
                                                                              "space-between",
                                                                      }}
                                                                  >
                                                                      <Typography
                                                                          component="p"
                                                                          sx={{
                                                                              fontWeight:
                                                                                  "bold",
                                                                              fontSize:
                                                                                  "14px",
                                                                              lineHeight:
                                                                                  "16px",
                                                                          }}
                                                                      >
                                                                          Производитель
                                                                      </Typography>
                                                                      <Typography
                                                                          component="p"
                                                                          sx={{
                                                                              fontSize:
                                                                                  "14px",
                                                                              lineHeight:
                                                                                  "16px",
                                                                          }}
                                                                      >
                                                                          {
                                                                              analog.brand
                                                                          }
                                                                      </Typography>
                                                                  </Box>

                                                                  <Box
                                                                      sx={{
                                                                          display:
                                                                              "flex",
                                                                          justifyContent:
                                                                              "space-between",
                                                                      }}
                                                                  >
                                                                      <Typography
                                                                          component="p"
                                                                          sx={{
                                                                              fontWeight:
                                                                                  "bold",
                                                                              fontSize:
                                                                                  "14px",
                                                                              lineHeight:
                                                                                  "16px",
                                                                          }}
                                                                      >
                                                                          Доступный
                                                                          остаток
                                                                          на
                                                                          складе
                                                                      </Typography>
                                                                      <Typography
                                                                          component="p"
                                                                          sx={{
                                                                              fontSize:
                                                                                  "14px",
                                                                              lineHeight:
                                                                                  "16px",
                                                                          }}
                                                                      >
                                                                          {
                                                                              item.count
                                                                          }
                                                                      </Typography>
                                                                  </Box>
                                                                  <Box
                                                                      sx={{
                                                                          display:
                                                                              "flex",
                                                                          justifyContent:
                                                                              "space-between",
                                                                      }}
                                                                  >
                                                                      <Typography
                                                                          component="p"
                                                                          sx={{
                                                                              fontWeight:
                                                                                  "bold",
                                                                              fontSize:
                                                                                  "14px",
                                                                              lineHeight:
                                                                                  "16px",
                                                                          }}
                                                                      >
                                                                          Цена
                                                                      </Typography>
                                                                      <Typography
                                                                          component="p"
                                                                          sx={{
                                                                              fontSize:
                                                                                  "14px",
                                                                              lineHeight:
                                                                                  "16px",
                                                                          }}
                                                                      >
                                                                          {
                                                                              item.price
                                                                          }{" "}
                                                                          ₽
                                                                      </Typography>
                                                                  </Box>
                                                              </AccordionDetails>
                                                          </Accordion>
                                                      ),
                                                  )}
                                              </Box>
                                          ) : null}
                                      </AccordionDetails>
                                  </Accordion>
                              ))
                            : null}
                    </Box>
                ) : null}
            </Box>
            <Snackbar
                open={isError}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                    {error ? error.message : "Возникла непредвиденная ошибка!"}
                </Alert>
            </Snackbar>
        </>
    );
}

export default App;
