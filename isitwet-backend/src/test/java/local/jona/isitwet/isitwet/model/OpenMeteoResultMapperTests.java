package local.jona.isitwet.isitwet.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.Test;

import local.jona.isitwet.isitwet.model.dto.WeatherDTO;
import local.jona.isitwet.isitwet.model.format.DurationFormat;
import local.jona.isitwet.isitwet.model.format.PrecipitationFormat;
import local.jona.isitwet.isitwet.model.format.TemperatureFormat;
import local.jona.isitwet.isitwet.model.format.TimeFormat;
import local.jona.isitwet.isitwet.model.mapper.OpenMeteoResultMapper;

public class OpenMeteoResultMapperTests {

    OpenMeteoResultMapper mapper = new OpenMeteoResultMapper();
    
    @Test
    public void testMapToDTO() {
        var input = new OpenMeteoResult();
        input.setLatitude(0.5F);
        input.setLongitude(0.5F);
        input.setElevation(1500F);
        input.setGenerationTimeMs(10F);
        input.setUtcOffset(0F);
        input.setTimezone("UTC");
        input.setTimezoneAbbreviation("UTC");
        var dailyUnits = input.new DailyUnits();
        dailyUnits.setTimeFormat(TimeFormat.ISO8601);
        dailyUnits.setMaxTemperatureFormat(TemperatureFormat.CELSIUS);
        dailyUnits.setMinTemperatureFormat(TemperatureFormat.CELSIUS);
        dailyUnits.setSunshineDurationFormat(DurationFormat.HOUR);
        dailyUnits.setRainSumFormat(PrecipitationFormat.MILLIMETERS);
        dailyUnits.setSnowfallFormat(PrecipitationFormat.MILLIMETERS);
        var hourlyUnits = input.new HourlyUnits();
        hourlyUnits.setTimeFormat(TimeFormat.ISO8601);
        hourlyUnits.setTemperatureFormat(TemperatureFormat.CELSIUS);
        hourlyUnits.setRelativeHumidityFormat("%");
        hourlyUnits.setRainFormat(PrecipitationFormat.MILLIMETERS);
        hourlyUnits.setSnowfallFormat(PrecipitationFormat.MILLIMETERS);
        var dailyMetrics = input.new DailyMetrics();
        dailyMetrics.setTimes(List.of("2025-01-01"));
        dailyMetrics.setMaxTemperatures(List.of(25.0F));
        dailyMetrics.setMinTemperatures(List.of(5.0F));
        dailyMetrics.setSunshineDurations(List.of(8.0F));
        dailyMetrics.setRainSums(List.of(5.0F));
        dailyMetrics.setSnowfallSums(List.of(0.0F));
        dailyMetrics.setWeatherCodes(List.of(1));
        var hourlyMetrics = input.new HourlyMetrics();
        hourlyMetrics.setTimes(List.of("2025-01-01T00:00", "2025-01-01T01:00", "2025-01-01T02:00",
            "2025-01-01T03:00", "2025-01-01T04:00", "2025-01-01T05:00",
            "2025-01-01T06:00", "2025-01-01T07:00", "2025-01-01T08:00",
            "2025-01-01T09:00", "2025-01-01T10:00", "2025-01-01T11:00",
            "2025-01-01T12:00", "2025-01-01T13:00", "2025-01-01T14:00",
            "2025-01-01T15:00", "2025-01-01T16:00", "2025-01-01T17:00",
            "2025-01-01T18:00", "2025-01-01T19:00", "2025-01-01T20:00",
            "2025-01-01T21:00", "2025-01-01T22:00", "2025-01-01T23:00"));
        hourlyMetrics.setTemperatures(List.of(5.0F, 5.0F, 5.0F, 6.0F, 7.0F, 8.0F,
            9.0F, 10.0F, 12.0F, 15.0F, 20.0F, 22.0F,
            22.0F, 25.0F, 25.0F, 20.0F, 18.0F, 15.0F,
            10.0F, 10.0F, 10.0F, 10.0F, 10.0F, 10.0F));
        hourlyMetrics.setRelativeHumidity(List.of(5.0F, 5.0F, 5.0F, 6.0F, 7.0F, 8.0F,
            9.0F, 10.0F, 12.0F, 15.0F, 20.0F, 22.0F,
            22.0F, 25.0F, 25.0F, 20.0F, 18.0F, 15.0F,
            10.0F, 10.0F, 10.0F, 10.0F, 10.0F, 10.0F));
        hourlyMetrics.setRain(List.of(5.0F, 5.0F, 5.0F, 6.0F, 7.0F, 8.0F,
            9.0F, 10.0F, 12.0F, 15.0F, 20.0F, 22.0F,
            22.0F, 25.0F, 25.0F, 20.0F, 18.0F, 15.0F,
            10.0F, 10.0F, 10.0F, 10.0F, 10.0F, 10.0F));
        hourlyMetrics.setSnowfall(Collections.nCopies(24, 0F));
        hourlyMetrics.setWeatherCodes(List.of(1, 1, 1, 2, 1, 1,
            2, 2, 2, 5, 5, 2,
            6, 6, 4, 4, 2, 2,
            1, 1, 1, 3, 2, 1));
        input.setDailyUnits(dailyUnits);
        input.setDaily(dailyMetrics);
        input.setHourlyUnits(hourlyUnits);
        input.setHourly(hourlyMetrics);

        var expectedResult = new WeatherDTO();
        expectedResult.setAltitude(1500F);
        expectedResult.setLatitude(0.5F);
        expectedResult.setLongitude(0.5F);
        var expectedHourly = expectedResult.new HourlyWeather();
        expectedHourly.setRain(List.of(5.0F, 5.0F, 5.0F, 6.0F, 7.0F, 8.0F,
            9.0F, 10.0F, 12.0F, 15.0F, 20.0F, 22.0F,
            22.0F, 25.0F, 25.0F, 20.0F, 18.0F, 15.0F,
            10.0F, 10.0F, 10.0F, 10.0F, 10.0F, 10.0F));
        expectedHourly.setSnow(Collections.nCopies(24, 0F));
        expectedHourly.setTemperatures(List.of(5.0F, 5.0F, 5.0F, 6.0F, 7.0F, 8.0F,
            9.0F, 10.0F, 12.0F, 15.0F, 20.0F, 22.0F,
            22.0F, 25.0F, 25.0F, 20.0F, 18.0F, 15.0F,
            10.0F, 10.0F, 10.0F, 10.0F, 10.0F, 10.0F));
        expectedHourly.setRelativeHumidity(List.of(5.0F, 5.0F, 5.0F, 6.0F, 7.0F, 8.0F,
            9.0F, 10.0F, 12.0F, 15.0F, 20.0F, 22.0F,
            22.0F, 25.0F, 25.0F, 20.0F, 18.0F, 15.0F,
            10.0F, 10.0F, 10.0F, 10.0F, 10.0F, 10.0F));
        expectedHourly.setTimes(List.of("2025-01-01T00:00", "2025-01-01T01:00", "2025-01-01T02:00",
            "2025-01-01T03:00", "2025-01-01T04:00", "2025-01-01T05:00",
            "2025-01-01T06:00", "2025-01-01T07:00", "2025-01-01T08:00",
            "2025-01-01T09:00", "2025-01-01T10:00", "2025-01-01T11:00",
            "2025-01-01T12:00", "2025-01-01T13:00", "2025-01-01T14:00",
            "2025-01-01T15:00", "2025-01-01T16:00", "2025-01-01T17:00",
            "2025-01-01T18:00", "2025-01-01T19:00", "2025-01-01T20:00",
            "2025-01-01T21:00", "2025-01-01T22:00", "2025-01-01T23:00"));
        var expectedQuarterly = expectedResult.new QuarterlyWeather();
        expectedQuarterly.setMaxTemperatures(List.of(8.0F, 22.0F, 25.0F, 10.0F));
        expectedQuarterly.setMinTemperatures(List.of(5.0F, 9.0F, 15.0F, 10.0F));
        expectedQuarterly.setRainSum(List.of(36.0F, 88.0F, 125.0F, 60.0F));
        expectedQuarterly.setSnow(List.of(0.0F, 0.0F, 0.0F, 0.0F));
        expectedQuarterly.setWeatherCodes(List.of(2, 5, 6, 3));
        var expectedDaily = expectedResult.new DailyWeather();
        expectedDaily.setDates(List.of("2025-01-01"));
        expectedDaily.setMaxTemperatures(List.of(25.0F));
        expectedDaily.setMinTemperatures(List.of(5.0F));
        expectedDaily.setSunshineDuration(List.of(8.0F));
        expectedDaily.setRainSum(List.of(5.0F));
        expectedDaily.setSnow(List.of(0.0F));
        expectedDaily.setWeatherCodes(List.of(1));
        expectedResult.setDaily(expectedDaily);
        expectedResult.setQuarterly(expectedQuarterly);
        expectedResult.setHourly(expectedHourly);

        var result = mapper.openMeteoResultToWeatherDTO(input);
        assertEquals(expectedResult, result, "We expect the result to be equal to expectedResult.");
    }
}
