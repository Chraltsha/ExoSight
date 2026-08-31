# import requests
# from skyfield.api import EarthSatellite


# CELESTRAK_GP_URL = (
#     "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle"
# )


# def load_satellites() -> list[EarthSatellite]:
#     """
#     Download the latest active satellite TLEs from CelesTrak.

#     Returns:
#         list[EarthSatellite]
#     """

#     response = requests.get(CELESTRAK_GP_URL)
#     response.raise_for_status()

#     tle_lines = response.text.strip().splitlines()

#     satellites = []

#     for i in range(0, len(tle_lines), 3):
#         name = tle_lines[i].strip()
#         line1 = tle_lines[i + 1].strip()
#         line2 = tle_lines[i + 2].strip()

#         satellites.append(
#             EarthSatellite(
#                 line1,
#                 line2,
#                 name,
#             )
#         )

#     return satellites



from skyfield.api import EarthSatellite, Loader

ACTIVE_SATELLITES_URL = (
    "https://celestrak.org/NORAD/elements/gp.php"
    "?GROUP=active"
    "&FORMAT=tle"
)


def load_satellites() -> list[EarthSatellite]:
    """
    Download the latest active satellite TLEs from CelesTrak.
    Cache the result in active_satellites.txt and re-download
    only when the file is older than 3 days.

    Returns:
        list[EarthSatellite]
    """
    load = Loader('/tmp')
    
    try:
        stale = load.days_old('active_satellites.txt') > 3.0
    except FileNotFoundError:
        stale = True
        
    if stale:
        load.download(ACTIVE_SATELLITES_URL, filename='active_satellites.txt')
    satellites = load.tle_file('active_satellites.txt')
    return satellites


if __name__ == "__main__":
    print(load_satellites())