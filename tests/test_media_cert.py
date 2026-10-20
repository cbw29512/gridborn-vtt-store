"""Pure media-verification regression tests; no browser or FFmpeg required."""
import copy
import logging
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "tools"))
from media_cert import check_video_metadata

logging.disable(logging.CRITICAL)


class VideoContractTests(unittest.TestCase):
    def setUp(self):
        try:
            self.record = {
                "streams": [{
                    "codec_name": "vp9", "width": 256, "height": 256,
                    "r_frame_rate": "10/1", "nb_read_frames": "450",
                    "tags": {"alpha_mode": "1"}
                }],
                "format": {"duration": "45.000000"},
            }
        except Exception:
            logging.exception("Unable to prepare mock ffprobe response")
            raise

    def test_valid_action_video(self):
        result = check_video_metadata(self.record, 256, 10, 45)
        self.assertEqual(result["frames"], 450)

    def test_missing_alpha_tag_fails(self):
        data = copy.deepcopy(self.record)
        data["streams"][0]["tags"] = {}
        with self.assertRaises(ValueError):
            check_video_metadata(data, 256, 10, 45)

    def test_wrong_frame_count_fails(self):
        data = copy.deepcopy(self.record)
        data["streams"][0]["nb_read_frames"] = "449"
        with self.assertRaises(ValueError):
            check_video_metadata(data, 256, 10, 45)

    def test_wrong_duration_fails(self):
        data = copy.deepcopy(self.record)
        data["format"]["duration"] = "40"
        with self.assertRaises(ValueError):
            check_video_metadata(data, 256, 10, 45)

    def test_missing_codec_fails(self):
        data = copy.deepcopy(self.record)
        data["streams"][0]["codec_name"] = "h264"
        with self.assertRaises(ValueError):
            check_video_metadata(data, 256, 10, 45)

    def test_rest_contract(self):
        data = copy.deepcopy(self.record)
        data["streams"][0]["nb_read_frames"] = "60"
        data["format"]["duration"] = "6.000000"
        self.assertEqual(check_video_metadata(data, 256, 10, 6)["frames"], 60)


if __name__ == "__main__":
    try:
        unittest.main()
    except Exception:
        logging.exception("Media contract tests failed to run")
        raise
