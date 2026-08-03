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



from skyfield.api import EarthSatellite, load

ACTIVE_SATELLITES_URL = (
    "https://celestrak.org/NORAD/elements/gp.php"
    "?GROUP=active"
    "&FORMAT=tle"
)


def load_satellites() -> list[EarthSatellite]:
    """
    Download the latest active satellite TLEs from CelesTrak.

    Returns:
        list[EarthSatellite]
    """
    satellites = load.tle_file(ACTIVE_SATELLITES_URL)
    return satellites


if __name__ == "__main__":
    print(load_satellites())