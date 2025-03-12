package local.jona.isitwet.isitwet.model.mapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Collectors;

import local.jona.isitwet.isitwet.model.OpenMeteoResult;
import local.jona.isitwet.isitwet.model.dto.WeatherDTO;

public class OpenMeteoResultMapper {

    public WeatherDTO openMeteoResultToWeatherDTO(OpenMeteoResult openMeteoResult) {
        var result = new WeatherDTO();
        result.setLongitude(openMeteoResult.getLongitude());
        result.setLatitude(openMeteoResult.getLatitude());
        result.setAltitude(openMeteoResult.getElevation());
        var daily = result.new DailyWeather();
        daily.setDates(openMeteoResult.getDaily().getTimes());
        daily.setWeatherCodes(openMeteoResult.getDaily().getWeatherCodes());
        daily.setWindSpeeds(openMeteoResult.getDaily().getWindSpeeds());
        daily.setWindDirections(openMeteoResult.getDaily().getWindDirections());

        switch (openMeteoResult.getDailyUnits().getMaxTemperatureFormat()) {
            case CELSIUS:
                daily.setMaxTemperatures(openMeteoResult.getDaily().getMaxTemperatures());
                break;
            case FAHRENHEIT:
                daily.setMaxTemperatures(
                    openMeteoResult.getDaily().getMaxTemperatures().stream()
                                    .map(OpenMeteoResultMapper::convertFahrenheitToCelsius)
                                    .collect(Collectors.toList())
                );
                break;
        }

        switch (openMeteoResult.getDailyUnits().getMinTemperatureFormat()) {
            case CELSIUS:
                daily.setMinTemperatures(openMeteoResult.getDaily().getMinTemperatures());
                break;
            case FAHRENHEIT:
                daily.setMinTemperatures(
                    openMeteoResult.getDaily().getMinTemperatures().stream()
                                    .map(OpenMeteoResultMapper::convertFahrenheitToCelsius)
                                    .collect(Collectors.toList())
                );
                break;
        }

        switch (openMeteoResult.getDailyUnits().getRainSumFormat()) {
            case MILLIMETERS:
                daily.setRainSum(openMeteoResult.getDaily().getRainSums());
                break;
            case CENTIMETERS:
                daily.setRainSum(
                    openMeteoResult.getDaily().getRainSums().stream()
                                    .map(x -> (float)(x / 10.0))
                                    .collect(Collectors.toList())
                );
                break;
        }

        switch (openMeteoResult.getDailyUnits().getSnowfallFormat()) {
            case MILLIMETERS:
                daily.setSnow(
                    openMeteoResult.getDaily().getSnowfallSums().stream()
                                    .map(x -> (float)(x * 10.0))
                                    .collect(Collectors.toList())
                );
                break;
            case CENTIMETERS:
                daily.setSnow(openMeteoResult.getDaily().getSnowfallSums());
                break;
        }

        switch (openMeteoResult.getDailyUnits().getSunshineDurationFormat()) {
            case SECOND:
                daily.setSunshineDuration(
                    openMeteoResult.getDaily().getSunshineDurations().stream()
                                    .map(x -> (float)(x / 3600.0))
                                    .collect(Collectors.toList())
                );
                break;
            case MINUTE:
                daily.setSunshineDuration(
                    openMeteoResult.getDaily().getSunshineDurations().stream()
                                    .map(x -> (float)(x / 60.0))
                                    .collect(Collectors.toList())
                );
                break;
            case HOUR:
                daily.setSunshineDuration(openMeteoResult.getDaily().getSunshineDurations());
                break;
        }
        result.setDaily(daily);

        var hourly = result.new HourlyWeather();
        hourly.setTimes(openMeteoResult.getHourly().getTimes());
        hourly.setRelativeHumidity(openMeteoResult.getHourly().getRelativeHumidity());
        hourly.setWindSpeeds(openMeteoResult.getHourly().getWindSpeeds());
        hourly.setWindDirections(openMeteoResult.getHourly().getWindDirections());

        switch (openMeteoResult.getHourlyUnits().getTemperatureFormat()) {
            case CELSIUS:
                hourly.setTemperatures(openMeteoResult.getHourly().getTemperatures());
                break;
            case FAHRENHEIT:
                hourly.setTemperatures(
                    openMeteoResult.getHourly().getTemperatures().stream()
                                    .map(OpenMeteoResultMapper::convertFahrenheitToCelsius)
                                    .collect(Collectors.toList())
                );
                break;
        }

        switch (openMeteoResult.getHourlyUnits().getRainFormat()) {
            case MILLIMETERS:
                hourly.setRain(openMeteoResult.getHourly().getRain());
                break;
            case CENTIMETERS:
                hourly.setRain(
                    openMeteoResult.getHourly().getRain().stream()
                                    .map(x -> (float)(x / 10.0))
                                    .collect(Collectors.toList())
                );
                break;
        }

        switch (openMeteoResult.getHourlyUnits().getSnowfallFormat()) {
            case MILLIMETERS:
                hourly.setSnow(
                    openMeteoResult.getHourly().getSnowfall().stream()
                                    .map(x -> (float)(x * 10.0))
                                    .collect(Collectors.toList())
                );
                break;
            case CENTIMETERS:
                hourly.setSnow(openMeteoResult.getHourly().getSnowfall());
                break;
        }
        result.setHourly(hourly);

        var quarterly = result.new QuarterlyWeather();
        var quarterlyWeatherCodes = new ArrayList<Integer>();
        var quarterlyMaxTemps = new ArrayList<Float>();
        var quarterlyMinTemps = new ArrayList<Float>();
        var quarterlyRain = new ArrayList<Float>();
        var quarterlySnow = new ArrayList<Float>();
        var quarterlyWindSpeeds = new ArrayList<Float>();
        for (var i = 0; i < hourly.getTimes().size(); i+=6) {
            quarterlyMaxTemps.add(Collections.max(hourly.getTemperatures().subList(i, i + 6)));
            quarterlyMinTemps.add(Collections.min(hourly.getTemperatures().subList(i, i + 6)));
            quarterlyWindSpeeds.add(Collections.max(hourly.getWindSpeeds().subList(i, i + 6)));
            quarterlyRain.add((float) hourly.getRain().subList(i, i + 6).stream().mapToDouble(a -> a).sum());
            quarterlySnow.add((float) hourly.getSnow().subList(i, i + 6).stream().mapToDouble(a -> a).sum());
            quarterlyWeatherCodes.add((Integer) Collections.max(openMeteoResult.getHourly().getWeatherCodes().subList(i, i + 6)));
        }
        quarterly.setMaxTemperatures(quarterlyMaxTemps);
        quarterly.setMinTemperatures(quarterlyMinTemps);
        quarterly.setWeatherCodes(quarterlyWeatherCodes);
        quarterly.setWindSpeeds(quarterlyWindSpeeds);
        quarterly.setRainSum(quarterlyRain);
        quarterly.setSnow(quarterlySnow);
        result.setQuarterly(quarterly);

        return result;
    }

    /**
     * Function to convert Fahrenheit to Celsius.
     *
     * @param fahrenheit temperature in Fahrenheit.
     * @return temperature in °C.
     */
    private static Float convertFahrenheitToCelsius(Float fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }
    
}
